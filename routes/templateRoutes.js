import express from 'express';
import {
  getTemplates,
  createTemplate,
  getTemplateById,
  updateTemplate,
  deleteTemplate,
} from '../controllers/templateController.js';

const router = express.Router();

router.get('/', getTemplates);
router.post('/', createTemplate);
router.get('/:id', getTemplateById); // This is not required by the prompt, but it's good practice.
router.put('/:id', updateTemplate);
router.delete('/:id', deleteTemplate);

export default router;
