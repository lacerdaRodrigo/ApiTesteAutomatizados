const User = require('../models/userModel02');

// Função para converter data do formato ddMMyyyy para yyyy-MM-dd
function formatDate(data) {
    const day = data.substring(0, 2);
    const month = data.substring(2, 4);
    const year = data.substring(4, 8);
    return `${year}-${month}-${day}`;
}

function iisValidDate(data) {



    if (!/^\d{8}$/.test(data)) {
        return false;
    }
    const day = parseInt(data.substring(0, 2), 10);
    const month = parseInt(data.substring(2, 4), 10);
    const year = parseInt(data.substring(4, 8), 10);

    if (day < 1 || day > 31 || month < 1 || month > 12 || year < 1900 || year > new Date().getFullYear()) {
        return false;
    }
    const date = new Date(`${year}-${month}-${day}`);
    return date.getDate() === day && date.getMonth() + 1 === month && date.getFullYear() === year;
}




module.exports = class UserController {
    static async createUser(req, res) {
        const { nome, telefone, email, dataNas } = req.body;

        // Validação de entrada
        if (!nome || !telefone || !email || !dataNas) {
            return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
        }

        if (!/^\d+$/.test(telefone)) {
            return res.status(400).json({ error: 'Telefone deve conter apenas números.' });
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            return res.status(400).json({ error: 'Email inválido.' });
        }

        // Converter data de nascimento para o formato esperado
        const formattedDate = formatDate(dataNas);
        const dataNascimento = new Date(formattedDate);
        if (isNaN(dataNascimento) || dataNascimento > new Date()) {
            return res.status(400).json({ error: 'Data de nascimento inválida.' });
        }

        try {
            const nomeExistente = await User.findOne({ nome });
            if (nomeExistente) {
                return res.status(400).json({ error: 'Nome já existe.' });
            }

            const user = new User({ nome, telefone, email, dataNas: formattedDate });
            await user.save();
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getUsers(req, res) {
        try {
            const users = await User.find();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async deleteUserNome(req, res) {
        try {
            const user = await User.findOneAndDelete({ nome: req.params.nome });
            if (!user) {
                return res.status(404).json({ error: 'Usuário não encontrado.' });
            }
            res.status(200).json({ message: 'Usuário deletado com sucesso.' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async updateUserNameById(req, res) {
        try {
            const currentName = req.body.currentName;
            const newName = req.body.newName;
            const updateUser = await User.findOneAndUpdate(
                { nome: currentName },
                { nome: newName },
                { new: true, runValidators: true }
            );
            if (!updateUser) {
                return res.status(404).json({ error: 'Usuário não encontrado.' });
            }
            res.status(200).json(updateUser);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};
