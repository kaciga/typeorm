import express from "express";
import { Client } from "../entities/Client";
import { createQueryBuilder } from "typeorm";

const router = express.Router();

router.get('/api/clients', async (req, res) => {
    const client = await createQueryBuilder(
        'client'
    )
    .select('client.first_name') //('client') //('client.first_name') vagy ('client.last_name')
    .addSelect('client.balance')
    .from(Client, 'client')
    .leftJoinAndSelect(
        'client.transactions',
        'transactions'
    )
    .where('client.balance = :balance', {balance: -750500900})
    .getMany();
    
    return res.json(client)
})

export { router as fetchClientRouter}