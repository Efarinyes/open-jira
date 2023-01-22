import type { NextApiRequest, NextApiResponse } from 'next'

import mongoose from 'mongoose';
import { db } from '../../../database';
import { Entry, IEntry } from '../../../models';
import { } from '../../../models/Entry';

type Data =
    | { message: string }
    | IEntry

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    const { id } = req.query;

    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ message: 'Id no vàlid' + ' ' + id })
    }
    switch (req.method) {
        case 'PUT':
            return modificaEntrada(req, res);

        case 'GET':
            return getEntry(req, res);

        case 'DELETE': 
            return deleteEntry(req, res)

        default:
            return res.status(400).json({ message: 'Mètode inexistent' })
    }
}

const deleteEntry = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query;
    await db.connect()
    const entryDBTodelete = await Entry.findByIdAndDelete(id)
    await db.disconnect()

    if(!entryDBTodelete) {
        return res.status(400).json({messsage: 'No hi ha entrada amb aquest id' + id })
    }
    return res.status(200).json(entryDBTodelete)
}

const getEntry = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query
    await db.connect()
    const cercaEntrada = await Entry.findById(id)
    await db.disconnect()
    if (!cercaEntrada) {

        res.status(400).json({ message: 'ID inexistent' })
    }
    res.status(200).json(cercaEntrada)
}

const modificaEntrada = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { id } = req.query;
    await db.connect();

    const entradaPerActualitazar = await Entry.findById(id);
    if (!entradaPerActualitazar) {
        await db.disconnect();
        return res.status(400).json({ message: 'No hi ha cap entrada amb aquest criteri' });
    }

    const {
        description = entradaPerActualitazar.description,
        status = entradaPerActualitazar.status
    } = req.body
    try {
        const actualitzaEntrada = await Entry.findByIdAndUpdate(id, { description, status }, { runValidators: true, new: true });
        await db.disconnect()
        res.status(200).json(actualitzaEntrada!)
    } catch (error: any) {
        console.log(error)
        await db.disconnect()
        res.status(400).json({ message: error.errors.status.message })
    }

    
    

    // Un altre manera d'actualitzar l'entrada de la BBDD
    // entradaPerActualitazar.description = description;
    // entradaPerActualitazar.status = status;
    // await entradaPerActualitazar.save()
}
