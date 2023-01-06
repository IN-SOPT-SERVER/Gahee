import { Request, Response } from "express";
import { contentsService } from "../service";
import { ContentsCreateDTO } from "../interfaces/ContentsCreateDTO";

const getAllContents = async(req: Request, res: Response)=> {
    const data = await contentsService.getAllContents();
    return res.status(200).json({ status: 200, message: "컨텐츠  전체 조회 성공", data });
}

const getOriginalSeries = async(req: Request, res:Response)=> {
    const data = await contentsService.getOriginalSeries();
    return res.status(200).json({status: 200, message: "오리지널 컨텐츠만 조회 성공", data})
}

const createContents = async(req: Request, res: Response) => {
    const contentsCreateDto : ContentsCreateDTO = req.body;
    const data = await contentsService.createContents(contentsCreateDto);
    return res.status(200).json({status:200, message:"컨텐츠 생성 완료~", data})
}

const deleteContents = async(req: Request, res: Response) => {
    const {contentId} = req.params;
    const data = await contentsService.deleteContents(+contentId);
    return res.status(200).json({status:200, message:"컨텐츠 삭제 완료~",data});
}

const updateLike = async(req: Request, res:Response) => {
    const {contentId} = req.params;
    const data = await contentsService.updateLike(+contentId);
    return res.status(200).json({status:200, message:"좋아요 업데이트 완료~하트하트 ",data});
}


const contentsController ={
    getAllContents,
    getOriginalSeries,
    createContents,
    deleteContents,
    updateLike
}
export default contentsController;