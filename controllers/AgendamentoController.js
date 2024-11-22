const Agendamento = require('../models/agendamentoModel');

// Função para converter data do formato ddMMyyyy para Date
function parseDate(data) {
    const day = parseInt(data.substring(0, 2), 10);
    const month = parseInt(data.substring(2, 4), 10) - 1; // O mês em JavaScript é zero-indexado
    const year = parseInt(data.substring(4, 8), 10);
    return new Date(year, month, day);
}

// Função para verificar se a data está no formato ddMMyyyy e é válida
function isValidDate(data) {
    const regex = /^\d{8}$/;
    if (!regex.test(data)) {
        return false; // Verifica se tem exatamente 8 dígitos
    }

    const date = parseDate(data);
    const day = data.substring(0, 2);
    const month = data.substring(2, 4);
    const year = data.substring(4, 8);

    // Verificar se a data realmente existe
    return date.getDate() === parseInt(day) &&
           date.getMonth() === parseInt(month) - 1 &&
           date.getFullYear() === parseInt(year);
}

// Função para formatar a data no formato ddMMyyyy para a saída
function formatDateOutput(date) {
    if (!(date instanceof Date) || isNaN(date)) {
        return null; // Retorna null se a data não for válida
    }
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Mês em JavaScript é zero-indexado
    const year = date.getFullYear();
    return `${day}${month}${year}`;
}

module.exports = class AgendamentoController {
    static async createAgendamento(req, res) {
        const { observacao, status, servico, clienteNome, data, horario } = req.body;

        if (!observacao || !status || !servico || !clienteNome || !data || !horario) {
            return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
        }

        if (!['Confirmado', 'Pendente', 'Cancelado'].includes(status)) {
            return res.status(400).json({ error: 'Status inválido.' });
        }

        if (!isValidDate(data)) {
            return res.status(400).json({ error: 'Data inválida.' });
        }

        const dataAgendamento = parseDate(data);
        if (dataAgendamento < new Date()) {
            return res.status(400).json({ error: 'Data e hora do agendamento inválidas.' });
        }

        try {
            const agendamento = new Agendamento({ observacao, status, servico, clienteNome, data: dataAgendamento, horario });
            await agendamento.save();
            res.status(201).json(agendamento);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getAgendamentos(req, res) {
        try {
            const agendamentos = await Agendamento.find();
            // Formatar a data de cada agendamento antes de enviar a resposta
            const formattedAgendamentos = agendamentos.map(agendamento => {
                return {
                    ...agendamento._doc,
                    data: formatDateOutput(new Date(agendamento.data)) // Certifica-se de que a data é um objeto Date
                };
            });
            res.status(200).json(formattedAgendamentos);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async updateAgendamento(req, res) {
        try {
            const { id } = req.params;
            const { observacao, status, servico, clienteNome, data, horario } = req.body;

            if (!observacao || !status || !servico || !clienteNome || !data || !horario) {
                return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
            }

            if (!['Confirmado', 'Pendente', 'Cancelado'].includes(status)) {
                return res.status(400).json({ error: 'Status inválido.' });
            }

            if (!isValidDate(data)) {
                return res.status(400).json({ error: 'Data inválida.' });
            }

            const dataAgendamento = parseDate(data);
            if (dataAgendamento < new Date()) {
                return res.status(400).json({ error: 'Data e hora do agendamento inválidas.' });
            }

            const agendamento = await Agendamento.findByIdAndUpdate(id, { observacao, status, servico, clienteNome, data: dataAgendamento, horario }, { new: true, runValidators: true });
            if (!agendamento) {
                return res.status(404).json({ error: 'Agendamento não encontrado.' });
            }

            res.status(200).json(agendamento);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async deleteAgendamento(req, res) {
        try {
            const { id } = req.params;
            const agendamento = await Agendamento.findByIdAndDelete(id);
            if (!agendamento) {
                return res.status(404).json({ error: 'Agendamento não encontrado.' });
            }

            res.status(200).json({ message: 'Agendamento deletado com sucesso.' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};
