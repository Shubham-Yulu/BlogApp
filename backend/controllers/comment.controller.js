import pool from "../database.js";

const createComment = async (req, res) => {
    try {
        const { text, post_id, user_id } = req.body;

        console.log(text, post_id, user_id);

        if (!text) {
            return res.status(400).json({ message: 'Comment text is required' });
        }

        if(!post_id){
            return res.status(400).json({message: 'Post id is required'});
        }

        await pool.query('INSERT INTO comments (text, user_id, post_id) VALUES (?, ?, ?)', [text, user_id, post_id]);

        res.status(200).json({ message : "Comment Created Successfully"});
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error });
    }
};

const deleteComment = async (req, res) => {
    try {
        const id = req.params.id;

        const [result] = await pool.query('DELETE FROM comments WHERE id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        res.status(200).json({ message: "Comment deleted successfully" });
    } catch (error) {
        console.error('Error deleting comment:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export {
    createComment,
    deleteComment,
};