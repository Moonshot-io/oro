/// <reference types="react" />
declare const ArtistThumbnail: ({ artistProps, updateSingle }: {
    artistProps: {
    id: number,
    artistName: string,
    bio: string,
    ticketId: string,
    youtube: string,
    twitter: string,
    facebook: string,
    instagram: string,
    itunes: string,
    wiki: string,
    homepage: string,
    image: string,
};
    updateSingle: ()=>void;
}) => JSX.Element;
export default ArtistThumbnail;
