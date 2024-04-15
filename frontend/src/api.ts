const baseUrl = 'http://localhost:3000/api/v1/';
const makeUrl = (path: string) => `${baseUrl}${path}`;

export const FeaturesApi = Object.freeze({
    getAll: ({
        page,
        per_page,
        mag_type
    }: {
        page: number;
        per_page: number;
        mag_type: string[];
    }) => {
        const params = new URLSearchParams({
            page: page.toString(),
            per_page: per_page.toString(),
            mag_type: mag_type.join(',')
        });
        return `${makeUrl('features')}?${params.toString()}`;
    }
});