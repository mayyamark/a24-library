const userBanStatusMiddleware = (banStatusData) => async (req, res, next) => {
  const banStatus = await banStatusData.getUserBanStatus(req.user.id);
  if (banStatus && banStatus.is_banned) {
    return res
      .status(403)
      .json({ message: `Banned due to ${banStatus.description}` });
  }
  next();
};

export default userBanStatusMiddleware;
