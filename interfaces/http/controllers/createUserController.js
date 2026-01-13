module.exports = (createUser) => async (req, res) => {
  try {
    const user = await createUser.execute(req.body);
    res.status(201).json(user);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};