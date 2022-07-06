import axios from "axios";

export async function getChannels() {
  let rawResponse = [];
  await axios.get('/channels').then(response => {
    rawResponse.push(response.data);
  });

  let channels = [];
  rawResponse[0].forEach(channel => {
    let aChannel = {
      name: channel['name'],
      id: channel['_id']
    };
    channels.push(aChannel);
  });

  return channels;
}

export async function getChannelsForUser(ids) {
  let rawResponse = [];
  // eslint-disable-next-line
  for (const channelID of ids) {
    await axios.get(`/channel/${channelID}`).then(value => {
      rawResponse.push(value.data);
    }).catch(err => {
      console.log(err)
      // todo do something with this exception?
    })
  }
  return rawResponse;
}

export async function addChannels(name, id) {
  let channel = "";

  await axios.post(
    '/channels',
    {
      "name": name,
      "ownerId": id
    },
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  ).then(res => {
    channel = res.data;
  }).catch(err => {
    throw err;
  });

  return channel;
}
