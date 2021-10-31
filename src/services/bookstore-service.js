export default class BookstoreService {
    getBooks() {
        return [
            {
                id: 1,
                title: 'Production releases',
                author: 'Stas Topov'
            },
            {
                id: 2,
                title: 'Release It!',
                author: 'Lisa Traus'
            }
        ];
    }
};