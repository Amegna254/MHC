const {
    Media,
    Listing,
    Like,
    View,
    Comment,
} = require("../models");

exports.getDashboard = async (req, res) => {
    try {

        const uploads = await Media.findAll({
            where: {
                uploadedBy: req.user.id,
            },
            include: [
                {
                    model: Listing,
                    as: "listing",
                },
            ],
            order: [["createdAt", "DESC"]],
        });

        let totalLikes = 0;
        let totalViews = 0;
        let totalComments = 0;

        const recentUploads = await Promise.all(

            uploads.slice(0,5).map(async(media)=>{

                const listing = media.listing;

                let likes = 0;
                let views = 0;
                let comments = 0;

                if(listing){

                    likes = await Like.count({
                        where:{
                            listingId:listing.id
                        }
                    });

                    views = await View.count({
                        where:{
                            listingId:listing.id
                        }
                    });

                    comments = await Comment.count({
                        where:{
                            listingId:listing.id
                        }
                    });

                }

                totalLikes += likes;
                totalViews += views;
                totalComments += comments;

                return{

                    id:media.id,
                    title:media.title,
                    fileType:media.fileType,
                    createdAt:media.createdAt,
                    likes,
                    views,
                    comments

                }

            })

        );

        const stats = {

            totalUploads:uploads.length,

            images:uploads.filter(x=>x.fileType==="image").length,

            videos:uploads.filter(x=>x.fileType==="video").length,

            audio:uploads.filter(x=>x.fileType==="audio").length,

            documents:uploads.filter(x=>x.fileType==="document").length

        };

        res.json({

            success:true,

            user:req.user,

            stats,

            recentUploads,

            performance:{

                totalViews,

                totalLikes,

                totalComments

            }

        });

    }
    catch(err){

        console.error(err);

        res.status(500).json({

            success:false,

            message:"Failed to load dashboard"

        });

    }
};