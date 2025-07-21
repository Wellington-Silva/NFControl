import { Router } from 'express';
import InvoiceController from '../controllers/InvoiceController';

const router = Router();

router.post('/issue', InvoiceController.issue);
router.get('/consultation', InvoiceController.consultation);
router.post('/validation', InvoiceController.validation);

export default router;