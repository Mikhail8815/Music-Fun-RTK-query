import type {
    CreatePlaylistArgs,
    PlaylistData,
    PlaylistsResponse, UpdatePlaylistArgs
} from "@/features/playlists/api/playlistsApi.types.ts";
import {baseApi} from "@/app/baseApi.ts";

export const playlistsApi = baseApi.injectEndpoints({
    endpoints: build => ({
        fetchPlaylists: build.query<PlaylistsResponse, void>({
            query: () => 'playlists',
            providesTags: ['Playlist'],
        }),
        createPlaylist: build.mutation<{ data: PlaylistData }, CreatePlaylistArgs>({
            query: (body) => {
                return {
                    method: 'POST',
                    url: 'playlists',
                    body
                }
            },
            invalidatesTags: ['Playlist'],
        }),
        deletePlaylist: build.mutation<void, string>({
            query: (playlistId) => {
                return {
                    method: 'DELETE',
                    url: `playlists/${playlistId}`,
                }
            },
            invalidatesTags: ['Playlist'],
        }),
        updatePlaylist: build.mutation<void, { playlistId: string, body: UpdatePlaylistArgs }>({
            query: ({playlistId, body}) => {
                return {
                    method: 'PUT',
                    url: `playlists/${playlistId}`,
                    body
                }
            },
            invalidatesTags: ['Playlist'],
        }),
    }),
})

export const { useFetchPlaylistsQuery, useCreatePlaylistMutation, useDeletePlaylistMutation, useUpdatePlaylistMutation } = playlistsApi