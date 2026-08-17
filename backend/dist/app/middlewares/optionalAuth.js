import config from "../config";
import { verifyToken } from "../utils/jwtHelper";
const optionalAuth = () => {
    return async (req, res, next) => {
        try {
            let token = req.cookies?.accessToken;
            if (!token && req.headers.authorization?.startsWith("Bearer ")) {
                token = req.headers.authorization.split(" ")[1];
            }
            if (token) {
                const verifiedUser = verifyToken(token, config.jwt.secret);
                req.user = verifiedUser;
            }
            next();
        }
        catch (error) {
            // If token is invalid, just proceed as guest
            next();
        }
    };
};
export default optionalAuth;
