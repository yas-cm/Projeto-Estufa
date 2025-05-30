const pool = require('../startup/db');

class SensoresController {
    static async getById(req, res) {
        const { id } = req.params;
        if (!id) return res.status(400).send({ message: "No id provided" });

        try {
            const [rows] = await pool.execute('SELECT * FROM sensores WHERE id = ?', [id]);
            if (rows.length === 0)
                return res.status(404).send({ message: "Sensor não encontrado" });

            return res.status(200).json(rows[0]);
        } catch (error) {
            return res.status(500).send({ error: error.message });
        }
    }

    static async getAllSensores(req, res) {
        try {
            const [rows] = await pool.execute('SELECT * FROM sensores');
            return res.status(200).json(rows);
        } catch (error) {
            return res.status(500).send({ error: error.message });
        }
    }
    static async getLatest(req, res) {
        try {
            const [rows] = await pool.execute(
                'SELECT * FROM sensores ORDER BY timestamp DESC LIMIT 1'
            );

            if (rows.length === 0) {
                return res.status(404).send({ message: "Nenhum dado encontrado" });
            }

            return res.status(200).json(rows[0]);
        } catch (error) {
            return res.status(500).send({ error: error.message });
        }
    }
    
    static async getByDate(req, res) {
        const { date } = req.query; // Exemplo: 2025-05-05
    
        if (!date) {
            return res.status(400).send({ message: "Data não fornecida" });
        }
    
        try {
            const [rows] = await pool.execute(
                'SELECT * FROM sensores WHERE DATE(timestamp) = ? ORDER BY timestamp DESC',
                [date]
            );
    
            if (rows.length === 0) {
                return res.status(404).send({ message: "Nenhum dado encontrado para essa data" });
            }
    
            return res.status(200).json(rows);
        } catch (error) {
            return res.status(500).send({ error: error.message });
        }
    }
    
}

module.exports = SensoresController;