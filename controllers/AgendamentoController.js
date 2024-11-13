const Agendamento = require('../models/agendamentoModel');

module.exports = class AgendamentoController {
    static async createAgendamento(req, res) {
        const { observacao ,status , servico } = req.body;
        try {
            const servicoExistente = await Agendamento.findOne({servico});
            if (servicoExistente)
            {
                return res.status(400).json({error: 'servico ja existe para esse usuario ( conectar usuario ainda nesse agendamento)'});
            }

            const agendamento = new Agendamento({observacao ,status , servico});
            await agendamento.save();
            res.status(201).json(agendamento);
        }catch (error)
        {
            res.status(500).json({error: error.message})
        }
    }

    static async getAgendamento(req,res){
        try{
            const agendamento = await Agendamento.find();
            res.status(200).json(agendamento);
        }catch (error)
        {
            res.status(500).json({error: error.message});
        }
    }
}