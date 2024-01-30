import { Router } from 'express';
import teamsRouter from './teams.route';
import userRouter from './user.route';

const router = Router();

router.use('/teams', teamsRouter);
router.use('/login', userRouter);

export default router;
