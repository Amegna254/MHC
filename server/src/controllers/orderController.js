const { Order, Listing, Media } = require("../models");

exports.createOrder = async (req, res) => {
  try {
    const { listingId } = req.body;

    const listing = await Listing.findByPk(listingId);

    if (!listing) {
      return res.status(404).json({
        message: "Listing not found",
      });
    }

    const order = await Order.create({
      buyerId: req.user.id,
      listingId: listing.id,
      amount: listing.price,
      currency: listing.currency,
      paymentMethod: "mpesa",
      status: "pending",
    });

    res.status(201).json(order);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create order",
    });
  }
};

exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: {
        buyerId: req.user.id,
      },
      include: [
        {
          model: Listing,
          as: "listing",
          include: [
            {
              model: Media,
              as: "media",
            },
          ],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    const formattedOrders = orders.map((order) => {
      const data = order.toJSON();

      if (data.listing?.media?.image) {
        const fileName = require("path").basename(data.listing.media.image);

        data.listing.media.image =
          `${req.protocol}://${req.get("host")}/uploads/${fileName}`;
      }

      return data;
    });

    res.json(formattedOrders);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to load orders",
    });
  }
};