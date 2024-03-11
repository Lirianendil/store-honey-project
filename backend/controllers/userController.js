const { User } = require("../schema/userSchema");
const { Order } = require("../schema/orderSchema");

const getUsers = async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
};

const createUser = async (req, res) => {
  const userData = req.body;
  const user = await User.create(userData);
  res.status(201).json(user);
};

const searchUsers = async (req, res) => {
  const { searchString } = req.query;

  console.log("req query => ", req.query);

  const users = await User.find({
    $or: [
      { name: new RegExp(searchString, "i") },
      { jobTitle: new RegExp(searchString, "i") },
    ],
  });

  res.status(200).json(users);
};

const getUserById = async (req, res) => {
  const { userId } = req.params;

  const user = await User.findById(userId);

  res.status(200).json(user);
};

const updateUser = async (req, res) => {
  const { userId } = req.params;

  const userData = req.body;

  const updatedUser = await User.findByIdAndUpdate(userId, userData, {
    new: true,
  });

  res.status(200).json(updatedUser);
};

const deleteUser = async (req, res) => {
  const { userId } = req.params;

  const user = await User.findByIdAndDelete(userId);

  res.status(200).json(user);
};

const addItemToCart = async (req, res) => {
  try {
    const reqUser = req.user;
    const { productId, amount } = req.body;
    const user = await User.findByIdAndUpdate(
      reqUser._id,
      {
        $push: { cart: { product: productId, amount: amount } },
      },
      { new: true }
    );

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const removeItemFromCart = async (req, res) => {
  try {
    const reqUser = req.user;
    const { productId } = req.body;
    const user = await User.findByIdAndUpdate(
      reqUser._id,
      {
        $pull: { cart: { product: productId } },
      },
      { new: true }
    );

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: JSON.stringify(error) });
  }
};

const updateItemInCart = async (req, res) => {
  try {
    const reqUser = req.user;
    const { productId, isInc } = req.body;
    const user = await User.findById(reqUser._id);

    const productToUpdate = user.cart.find((item) => item.product == productId);

    const numberToUpdate = isInc
      ? productToUpdate.amount + 1
      : productToUpdate.amount - 1;

    if (numberToUpdate === 0)
      return res.status(200).json({ message: "Cannot decrease further" });

    const updatedUser = await User.findByIdAndUpdate(
      reqUser._id,
      {
        $set: {
          "cart.$[elem].amount": numberToUpdate,
        },
      },
      {
        arrayFilters: [{ "elem.product": productId }],
        new: true,
      }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: JSON.stringify(error.message) });
  }
};

module.exports = {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  createUser,
  searchUsers,
  addItemToCart,
  removeItemFromCart,
  updateItemInCart,
};
