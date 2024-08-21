export class QueryDto {
    take?: number;
    skip?: number;
    searchString?: string;
    orderBy?: "asc" | "desc";
}
