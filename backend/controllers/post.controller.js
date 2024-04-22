import pool from "../database.js";

const getPosts = async (req, res) => {
    try {
        const [posts] = await pool.query('SELECT * FROM posts LIMIT 20');
        res.status(200).json({ posts });
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


const getPost = async (req, res) => {
    try {
        const id = req.params.id;

        const [posts] = await pool.query('SELECT * FROM posts WHERE id = ?', [id]);

        if (posts.length === 0) {
            return res.status(404).json({ message: 'Post not found' });
        }

        const post = posts[0];
        res.status(200).json(post);
    } catch (error) {
        console.error('Error fetching post:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


const createPost = async (req, res) => {
    try {
        const { title, description, user_id } = req.body;
        const imageUrl = req.imageUrl;

        if (!title || !description || !user_id || !imageUrl) {
            return res.status(400).json({ message: 'All field are required' });
        }

        await pool.query('INSERT INTO posts (title, description, imageUrl, user_id) VALUES (?, ?, ?, ?)', [title, description, imageUrl, user_id]);

        res.status(200).json({ message : "Post Created Successfully"});
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error });
    }
};

const deletePost = async (req, res) => {
    try {
        const id = req.params.id;

        const result = await pool.query('DELETE FROM posts WHERE id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Post not found' });
        }

        res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export {
    getPosts,
    getPost,
    createPost,
    deletePost
};