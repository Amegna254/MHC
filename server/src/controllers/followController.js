const { Follow, User } = require("../models");

exports.followCreator = async (req, res) => {
  try {
    const followerId = req.user.id;
    const followingId = Number(req.params.creatorId);

    if (followerId === followingId) {
      return res.status(400).json({
        message: "You cannot follow yourself.",
      });
    }

    const creator = await User.findByPk(followingId);

    if (!creator) {
      return res.status(404).json({
        message: "Creator not found.",
      });
    }

    const [follow, created] = await Follow.findOrCreate({
      where: {
        followerId,
        followingId,
      },
    });

    if (!created) {
      return res.json({
        following: true,
        message: "Already following.",
      });
    }

    res.status(201).json({
      following: true,
      message: "Creator followed successfully.",
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to follow creator.",
    });
  }
};

exports.unfollowCreator = async (req, res) => {
  try {
    const followerId = req.user.id;
    const followingId = Number(req.params.creatorId);

    await Follow.destroy({
      where: {
        followerId,
        followingId,
      },
    });

    res.json({
      following: false,
      message: "Creator unfollowed.",
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to unfollow creator.",
    });
  }
};

exports.getFollowStatus = async (req, res) => {
  try {
    const followerId = req.user?.id;
    const followingId = Number(req.params.creatorId);

    if (!followerId) {
      return res.json({
        following: false,
      });
    }

    const follow = await Follow.findOne({
      where: {
        followerId,
        followingId,
      },
    });

    const followers = await Follow.count({
      where: {
        followingId,
      },
    });

    const following = await Follow.count({
      where: {
        followerId: followingId,
      },
    });

    res.json({
      following: !!follow,
      followers,
      followingCount: following,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to load follow status.",
    });
  }
};