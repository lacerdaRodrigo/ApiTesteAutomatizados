const Agendamento = require('../models/agendamentoModel');
//FAZER A REGRA DE NEGOCIO AQUI !!!!
module.exports = class AgendamentoController {
    static async createAgendamento(req, res) {
        const { observacao, status, servico } = req.body;
        try {
            const servicoExistente = await Agendamento.findOne({ servico });
            if (servicoExistente) {
                return res.status(400).json({ error: 'servico ja existe para esse usuario ( conectar usuario ainda nesse agendamento)' });
            }

            const agendamento = new Agendamento({ observacao, status, servico });
            await agendamento.save();
            res.status(201).json(agendamento);
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

    static async getAgendamento(req, res) {
        try {
            const agendamento = await Agendamento.find();
            res.status(200).json(agendamento);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async deleteUserAgendamento(req,res){
        try{
            const agendamento = await Agendamento.findOneAndDelete({ servico: req.params.servico});
            if(!agendamento){
                return res.status(404).json({ error: 'Usuario não encontrado'});
            }
            res.status(200).json({ message: 'Usuario deletado Com sucesso'});
        } catch (error){
            res.status(500).json({error: error.message})
        }
    }
}