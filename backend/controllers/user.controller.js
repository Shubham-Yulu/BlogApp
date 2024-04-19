const getProfile = async (req, res) => {
    try {

        res.status(200).json({ message : "hello"});
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error });
    }
};

export {
    getProfile,
};
