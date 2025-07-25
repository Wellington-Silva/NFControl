import { Router } from 'express';
import InvoiceController from '../controllers/InvoiceController';

const router = Router();

router.get('/', InvoiceController.list);
router.post('/issue', InvoiceController.issue);
router.delete('/cancel', InvoiceController.cancel);
router.post('/validate', InvoiceController.validation);
router.get('/consultation', InvoiceController.consultation);

export default router;