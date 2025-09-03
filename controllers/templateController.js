import Template from '../models/Template.js';


export const getTemplates = async (req, res) => {
  try {
    const templates = await Template.find();
    res.status(200).json(templates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const createTemplate = async (req, res) => {
  const { type, content, labels, author } = req.body;

  if (!type || !content || !author) {
    return res.status(400).json({ message: 'Missing required fields: type, content, or author' });
  }

  const newTemplate = new Template({
    type,
    content,
    labels,
    author,
  });

  try {
    const savedTemplate = await newTemplate.save();
    res.status(201).json(savedTemplate);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


export const getTemplateById = async (req, res) => {
  try {
    const template = await Template.findById(req.params.id);
    if (!template) {
      return res.status(404).json({ message: 'Template not found' });
    }
    res.status(200).json(template);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const updateTemplate = async (req, res) => {
  const { type, content, labels, author } = req.body;

  if (!type || !content || !author) {
    return res.status(400).json({ message: 'Missing required fields: type, content, or author' });
  }

  try {
    const updatedTemplate = await Template.findByIdAndUpdate(
      req.params.id,
      { type, content, labels, author },
      { new: true } // Return the updated document
    );

    if (!updatedTemplate) {
      return res.status(404).json({ message: 'Template not found' });
    }

    res.status(200).json(updatedTemplate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const deleteTemplate = async (req, res) => {
  try {
    const deletedTemplate = await Template.findByIdAndDelete(req.params.id);

    if (!deletedTemplate) {
      return res.status(404).json({ message: 'Template not found' });
    }

    res.status(200).json({ message: 'Template deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
