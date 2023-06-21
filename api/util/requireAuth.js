import * as dotenv from 'dotenv'
import { auth } from  'express-oauth2-jwt-bearer'

dotenv.config();

// This checks if the user is authenticated
const requireAuth = auth({
    audience: process.env.AUTH0_AUDIENCE,
    issuerBaseURL: process.env.AUTH0_ISSUER,
    tokenSigningAlg: 'RS256'
    });

export default requireAuth;