export default class BookstoreService {
    data = [
        {
            id: 1,
            title: 'Production releases',
            author: 'Stas Topov',
            price: 32,
            coverImage: "https://m.media-amazon.com/images/I/51DZeZw7K0L.jpg"
        },
        {
            id: 2,
            title: 'Release It!',
            author: 'Lisa Traus',
            price: 35,
            coverImage: "https://m.media-amazon.com/images/I/51gJspjNQXL.jpg"
        }
    ];

    getBooks() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if(Math.random() > 0.85){
                    reject(new Error('Something bad happend'));
                }else{
                    resolve(this.data);
                }
            }, 700);
        });
    }
};