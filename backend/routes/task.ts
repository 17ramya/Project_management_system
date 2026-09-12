import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticate, AuthRequest } from '../middleware/auth';

const router = express.Router();
const prisma = new PrismaClient();

// Get all tasks (with optional filters)
router.get('/', authenticate, async (req: AuthRequest, res) => {
  try {
    const userId = req.user!.id;
    const { projectId, status, priority, search } = req.query;

    const whereClause: any = { userId };
    
    if (projectId) whereClause.projectId = String(projectId);
    if (status) whereClause.status = String(status);
    if (priority) whereClause.priority = String(priority);
    if (search) {
      whereClause.name = { contains: String(search), mode: 'insensitive' };
    }

    const tasks = await prisma.task.findMany({
      where: whereClause,
      include: { project: { select: { name: true } } }
    });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

// Get a single task
router.get('/:id', authenticate, async (req: AuthRequest, res) => {
  try {
    const userId = req.user!.id;
    const id = String(req.params.id);
    const task = await prisma.task.findFirst({
      where: { id, userId },
      include: { project: true }
    });

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch task' });
  }
});

// Create a task
router.post('/', authenticate, async (req: AuthRequest, res) => {
  try {
    const userId = req.user!.id;
    const { name, description, priority, status, dueDate, projectId } = req.body;

    if (!name || !projectId) {
      return res.status(400).json({ error: 'Task name and Project ID are required' });
    }

    // Verify project belongs to user
    const project = await prisma.project.findFirst({ where: { id: projectId, userId } });
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    const task = await prisma.task.create({
      data: {
        name,
        description,
        priority: priority || 'Medium',
        status: status || 'Pending',
        dueDate: dueDate ? new Date(dueDate) : null,
        projectId,
        userId
      }
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create task' });
  }
});

// Update a task
router.put('/:id', authenticate, async (req: AuthRequest, res) => {
  try {
    const userId = req.user!.id;
    const id = String(req.params.id);
    const { name, description, priority, status, dueDate } = req.body;

    const existingTask = await prisma.task.findFirst({ where: { id, userId } });
    if (!existingTask) {
      return res.status(404).json({ error: 'Task not found' });
    }

    const task = await prisma.task.update({
      where: { id },
      data: {
        name,
        description,
        priority,
        status,
        dueDate: dueDate ? new Date(dueDate) : null,
      }
    });

    // Auto-complete project if all tasks are completed
    if (status === 'Completed') {
      const allProjectTasks = await prisma.task.findMany({ where: { projectId: existingTask.projectId } });
      const allCompleted = allProjectTasks.length > 0 && allProjectTasks.every((t: any) => t.status === 'Completed');
      
      if (allCompleted) {
        await prisma.project.update({
          where: { id: existingTask.projectId },
          data: { status: 'Completed' }
        });
      }
    } else if (status === 'Pending' || status === 'In Progress') {
      // If task is not completed, ensure project is marked as In Progress (if it was previously completed by accident)
      await prisma.project.update({
        where: { id: existingTask.projectId },
        data: { status: 'In Progress' }
      });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update task' });
  }
});

// Delete a task
router.delete('/:id', authenticate, async (req: AuthRequest, res) => {
  try {
    const userId = req.user!.id;
    const id = String(req.params.id);

    const existingTask = await prisma.task.findFirst({ where: { id, userId } });
    if (!existingTask) {
      return res.status(404).json({ error: 'Task not found' });
    }

    await prisma.task.delete({ where: { id } });
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
});

export default router;
