export async function errorTreatment(req, res){
    res.render('error', {
        error: req.body.error
    });
}