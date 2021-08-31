import express from "express";
import { Transaction, TransactionTypes } from "../entities/Transaction";
import { Client } from "../entities/Client";

const router = express.Router();

router.post("/api/client/:clientId/transaction", async (req, res) => {
    const { clientId } = req.params;

    const { type, amount } = req.body;

    const client = await Client.findOne(parseInt(clientId)); //parse integer kell, mert az id szám

    if(!client) {
        return res.json({
            msg: "Client not found"
        })
    }

    const transaction = Transaction.create({
        amount,
        type,
        client //nem azt írjuk client_id = ClientId, ilyen oszlop nincs a transactionben, hanem ezért client, mert a teljes client tartalmazza az id-t
    });

    await transaction.save();

    if (type === TransactionTypes.DEPOSIT) {
        client.balance = client.balance + amount
    } else if (type === TransactionTypes.WITHDRAW) {
        client.balance = client.balance - amount
    }

    await client.save();

    return res.json({
        msg: "Transaction added"
    })
 })

 export { router as createTransactionRouter }
