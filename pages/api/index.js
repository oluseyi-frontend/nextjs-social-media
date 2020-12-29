
import connectToDb from './../../utils/dbConnect';

connectToDb()

export default (req, res) => {
 res.send('starting app')
};