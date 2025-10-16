import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type {
    CreatePlaylistArgs,
    FetchPlaylistsArgs, PlaylistData,
    PlaylistsResponse, UpdatePlaylistArgs
} from "@/features/playlists/api/playlistsApi.types.ts";

export const playlistsApi = createApi({
    reducerPath: 'playlistsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BASE_URL,
        headers: {
            'API-KEY': import.meta.env.VITE_API_KEY,
        },
        prepareHeaders: headers => {
            headers.set('Authorization', `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`)
            return headers
        },
    }),
    endpoints: build => ({
        fetchPlaylists: build.query<PlaylistsResponse, void>({
            query: () => 'playlists',
        }),
        createPlaylist: build.mutation<{ data: PlaylistData }, CreatePlaylistArgs>({
            query: (body) => {
                return {
                    method: 'POST',
                    url: 'playlists',
                    body
                }
            }
        }),
        deletePlaylist: build.mutation<void, string>({
            query: (playlistId) => {
                return {
                    method: 'DELETE',
                    url: `playlists/${playlistId}`,
                }
            }
        }),
        updatePlaylist: build.mutation<void, { playlistId: string, body: UpdatePlaylistArgs }>({
            query: ({playlistId, body}) => {
                return {
                    method: 'PUT',
                    url: `playlists/${playlistId}`,
                    body
                }
            }
        }),
    }),
})

export const { useFetchPlaylistsQuery, useCreatePlaylistMutation, useDeletePlaylistMutation, useUpdatePlaylistMutation } = playlistsApi