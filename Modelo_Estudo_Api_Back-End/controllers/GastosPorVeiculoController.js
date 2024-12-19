const GastoPorVeiculo = require('../models/GastosPorVeiculoModel')



module.exports = class GastosPorVeiculoController {
    //POST Criar Gastos pos Veiculo
    static async  PostGastosPorVeiculo(req,res){
        const { tipoVeiculo , mes , combustivel , manutencao , seguro , outros , total} = req.body;
        
        if(!tipoVeiculo){
            return res.status(422).json({ message: " Tipo de veiculo e obrigatorio."})
        }
            

        try {
            const newGastosPorVeiculo = new GastoPorVeiculo({ tipoVeiculo, mes, combustivel, manutencao, seguro, outros, total });

            await newGastosPorVeiculo.save();

            return res.status(200).json({ message: 'Cadastro com Sucesso' });
        } catch (error) {
            return res.status({error: 'xxx'})
        }
    }

    // static async getGastosPorVeiculo(req,res){
    //     const gastosPorVeiculo = await GastosPorVeiculo.find()

    //     try {
    //         return res.status(200).json(gastosPorVeiculo);
    //     } catch (error) {
    //         res.status(500).json({ error: 'Não encontramos ninguem cadastrado' });
    //     }
    // }
}