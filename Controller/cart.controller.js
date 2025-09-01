import Cart from "../Model/cart.model.js";
import Product from "../Model/product.model.js";

// Get all cart items for a user
export const getCartItems = async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await Cart.findOne({ userId }).populate("items.productId");
    if (!cart || cart.items.length === 0) {
      return res.status(200).send({ message: "No Items In the cart" }); // return empty array instead of 404
    }
    res.status(200).json(cart.items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add product to cart
export const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({
        userId,
        items: [{ productId, quantity }],
      });
    } else {
      const itemIndex = cart.items.findIndex(
        (item) => item.productId.toString() === productId
      );

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ productId, quantity });
      }
    }

    await cart.save();
    res.status(201).json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update quantity
export const updateCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const { userId } = req.params;

    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find(
      (item) => item.productId.toString() === productId
    );

    if (!item) return res.status(404).json({ message: "Item not found" });
    if (quantity <= 0) {
      return res
        .status(400)
        .json({ message: "Quantity must be greater than 0" });
    }
    item.quantity = quantity;
    await cart.save();

    res.json({ message: "Cart updated successfully", cart });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete item
export const deleteCartItem = async (req, res) => {
  try {
    const { userId, productId } = req.params;

    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const itemExists = cart.items.some(
      (item) => item.productId.toString() === productId
    );

    if (!itemExists) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );

    await cart.save();

    res.json({ message: "Item removed from cart", cart });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
