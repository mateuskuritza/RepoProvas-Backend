import { Request, Response } from "express";
import * as coursesServices from "../services/coursesServices";
import schema from "../schemas/Courses";

export async function getAll(req: Request, res: Response) {
    try {
        const allCourses = await coursesServices.allCourses();
        res.status(200).send(allCourses);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}

export async function getTeachers(req: Request, res: Response) {
    try {
        const courseId = Number(req.params.id);
        if (!courseId) return res.status(400).send("id missing");
        const allTeachers = await coursesServices.courseTeachers(courseId);
        res.status(200).send(allTeachers);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}

export async function getSubjects(req: Request, res: Response) {
    try {
        const subjectId = Number(req.params.id);
        if (!subjectId) return res.status(400).send("id missing");
        const allSubjects = await coursesServices.courseSubjects(subjectId);
        res.status(200).send(allSubjects);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}

export async function createCourse(req: Request, res: Response) {
    try {
        const course = req.body;
        const { error } = schema.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        const newCourse = await coursesServices.createCourse(course);
        res.status(201).send(newCourse);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}