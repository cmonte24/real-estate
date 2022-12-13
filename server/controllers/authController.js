import OwnerUser from "../models/OwnerUser.js";
import TenantUser from "../models/TenantUser.js";

const login = async (req, res) => {
  res.json({ message: "Login route" });
};

const register = async (req, res) => {
  console.log(req.body);
  const { role } = req.body;
  if (role === "owner") {
    const owner = await OwnerUser.create(req.body);
    res.status(201).json({ owner });
  } else if (role === "tenant") {
    const tenant = await TenantUser.create(req.body);
    res.status(201).json({ tenant });
  } else {
    res.status(400).json({ message: "Invalid role" });
  }
};

export { login, register };
