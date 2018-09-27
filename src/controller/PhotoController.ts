import {getRepository, getConnection} from "typeorm";
import {NextFunction, Request, Response} from "express";
import * as Clarifai from 'clarifai';
import {Photo} from "../entity/Photo";
import {Face} from "../entity/Face";

const app: any = new Clarifai.App({
    apiKey: 'c90c02fde6f247468c9090df3ec6a1f6'
});

export class PhotoController {

    private photoRepository = getRepository(Photo);
    private faceRepository = getRepository(Face);

    async handleSubmitImage(req: Request, res: Response, next: NextFunction) {
        const {imageUrl} = req.body;

        await getConnection().transaction(async trxManager => {
            const faces = await getFaceLocations(imageUrl);
            // const faces: any = [
            //     {
            //         "leftFrame": 28,
            //         "topFrame": 30.6,
            //         "rightFrame": 37.5,
            //         "bottomFrame": 43.3,
            //     },
            //     {
            //         "leftFrame": 65.6,
            //         "topFrame": 33,
            //         "rightFrame": 74.3,
            //         "bottomFrame": 44.6,
            //     },
            //     {
            //         "leftFrame": 56.6,
            //         "topFrame": 34.5,
            //         "rightFrame": 65.9,
            //         "bottomFrame": 46.8,
            //     },
            //     {
            //         "leftFrame": 40,
            //         "topFrame": 30.7,
            //         "rightFrame": 48.7,
            //         "bottomFrame": 42.4,
            //     }
            // ];
            const { id } = await trxManager.save(trxManager.create(Photo, {
                imageUrl,
                //temp
                photoOwner: 'somebody'
                //temp
            }));
            // const faceArrRes = await trxManager
            //     .createQueryBuilder()
            //     .insert()
            //     .into(Face)
            //     .values(
            //         faces.map(face => Object.assign(face, {photoId: id}))
            //     )
            //     .execute();
            const faceArrRes = await trxManager.save(faces.map(face => trxManager.create(Face, Object.assign(face, {photoId: id}))));
            res.json( {
                id, 
                faces,
                faceArrRes
            } );  

        })
        .catch(err => {
            console.log('err', err);
            res.status(400).json(err)
        });

    }

    async all(request: Request, response: Response, next: NextFunction) {
        return this.photoRepository.find();
    }

    async one(request: Request, response: Response, next: NextFunction) {
        return this.photoRepository.findOne(request.params.id);
    }

    async save(request: Request, response: Response, next: NextFunction) {
        return this.photoRepository.save(request.body);
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        // await this.userRepository.remove(request.params.id);
        return this.photoRepository.remove(request.params.id);
    }

}

function getFaceLocations(url: string): Promise<any> {
    return app.models
    .predict(Clarifai.FACE_DETECT_MODEL, url)
    .then(data => {
        if(data) {
            const faces = data.outputs[0].data.regions;

            return faces.map( face => {
                const {left_col, top_row, right_col, bottom_row} = face.region_info.bounding_box;
                return {
                    leftFrame: +(left_col * 100).toFixed(1),
                    topFrame: +(top_row * 100).toFixed(1),
                    rightFrame: +(right_col * 100).toFixed(1),
                    bottomFrame: +(bottom_row * 100).toFixed(1),
                };
            });
        } 
    })
}