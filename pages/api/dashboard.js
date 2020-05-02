import jwt from "jsonwebtoken";
import jwkToPem from "jwk-to-pem";
import axios from "axios";

const jwksUrl = `https://cognito-idp.${process.env.REGION}.amazonaws.com/${process.env.USER_POOL_ID}/.well-known/jwks.json`;
const jwksPromise = axios.get(jwksUrl);

const isAuthenticatedRequest = (req) =>
  jwksPromise.then(({ data: { keys } }) => {
    const token = req.headers["authorization"].replace("Bearer ", "");
    const decoded = jwt.decode(token, { complete: true });
    const key = keys.find(({ kid }) => kid === decoded.header.kid);
    const pem = jwkToPem(key);
    jwt.verify(token, pem, { algorithms: ["RS256"] });
  });

export default (req, res) =>
  isAuthenticatedRequest(req)
    .then(() => {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.end(
        JSON.stringify({
          status: "authenticated",
          timestamp: new Date().getTime(),
        })
      );
    })
    .catch(() => {
      res.statusCode = 500;
      res.end(JSON.stringify({ message: "Internal Server Error" }));
    });
