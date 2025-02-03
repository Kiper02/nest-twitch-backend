import 'express-session'
import type { SessionMetaData } from './session-metadata.types';

declare module 'express-session' {
    interface SessionData {
        userId?: string;
        createdAt?: Date | string; 
        metadata: SessionMetaData;
    }
}