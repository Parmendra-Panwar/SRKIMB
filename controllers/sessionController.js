exports.checkSession = (req, res) => {
  if (req.isAuthenticated()) {
    return res.status(200).json({ success: true, user: req.user });
  }
  return res.status(401).json({ success: false, message: 'No active session' });
};

// exports.logoutUser = (req, res) => {
//   req.logout((err) => {
//     if (err) {
//       console.error('Error during logout:', err);
//       return res.status(500).json({ success: false, message: 'Logout error' });
//     }
//     res.status(200).json({ success: true, message: 'Logged out successfully' });
//   });
// };
