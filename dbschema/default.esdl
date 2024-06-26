module default {

    abstract type HasTimestamps {
        required createdAt: datetime {
        readonly := true;
        default := datetime_of_statement();
        };
    };

    type BlogPosts extending HasTimestamps{
        required title: str;
        required content: str;
        required userName: str;
    }
}
