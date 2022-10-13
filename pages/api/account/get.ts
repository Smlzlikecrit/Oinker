import { types } from "../../../environments/api/user";
import { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";
import fetch from 'node-fetch'
import { json } from "stream/consumers";

const NEXT_PUBLIC_SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const NEXT_PUBLIC_SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const SUPABASE_SECRET_KEY = process.env.SUPABASE_SECRET_KEY as string;

type gqlResponse = {
  data: {
    profilesCollection: {
      edges: {
        node: {
          key: string;
        };
      }[];
    };
  };
};

const QUERY = `
  mutation ($key: UUID) {
    insertIntoprofilesCollection(objects: { key: $key }) {
      records {
        key
      }
    }
  }
`;

const supabase = createClient(
  NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_KEY
);

export const handler = async (
  request: NextApiRequest,
  response: NextApiResponse<types.userResponse>
) => {
  try {
    const { email, password } = JSON.parse(request.body);
    const supabaseResponse = await supabase.auth.signUp({ email, password });
    
    if (supabaseResponse.error) {
      return response.status(500).json({
        status: "error",
        error: supabaseResponse.error.message,
      });
    }
    if (!supabaseResponse.session) throw new Error('"session" is expected');
    if (!supabaseResponse.user) throw new Error('"user" is expected');


    const gqlResponse = await fetch(`${process.env.SUPABASE_URL}/graphql/v1`, {
      body: JSON.stringify({
        method: 'POST',
        query: QUERY,
        variables: { key: supabaseResponse.user.id },
      }),
      headers: {
        'Content-Type': 'application/json',
        apiKey: SUPABASE_SECRET_KEY,
      }
  });

    const { data } = (await gqlResponse.json()) as gqlResponse

    if (!data.profilesCollection.edges[0].node.key) {
        return response.status(500).json({
            status: 'error',
            error: 'Something went wrong on our side, please try again.'
        } as const)
    }

    return response.status(200).json({
      status: "success",
      user: {
        email,
        id: supabaseResponse.user.id,
        token: supabaseResponse.session.access_token,
      },
    });
  } catch (error) {
    console.error(error);

    return response.status(500).json({
      status: "error",
      error: "Something went wrong on our side, please try again.",
    } as const);
  }
};

export default handler