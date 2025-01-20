const apiClient = {
  baseURL: "https://spotifyapi.phaedra.ir",
  headers: {
    'Content-Type': 'application/json'
  }
};

const loginUser = async (username, password) => {
  try {
    const response = await fetch(apiClient.baseURL + '/IAM/Auth/login', {
      method: 'POST',
      headers: apiClient.headers,
      body: JSON.stringify({
        username,
        password
      })
    });

    if (response.status !== 200) {
      return {
        success: false,
        message: 'Login failed',
        token: null
      };
    }

    let data = await response.json();
    return {
      success: true,
      message: 'Login successful',
      token: data.token
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'Login failed',
      data: null
    };
  }
};

const verifyPhone = async (phoneNumber, code) => {
  try {
    const response = await fetch(apiClient.baseURL + '/IAM/Auth/verify-phone', {
      method: 'POST',
      headers: apiClient.headers,
      body: JSON.stringify({
        phoneNumber,
        code
      })
    });
    if (response.status !== 200)
      return {
        success: false,
        message: 'Phone verification failed',
        token: null
      };

    let data = await response.json();

    return {
      success: true,
      message: 'Phone verification successful',
      token: data.token
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'Phone verification failed',
      data: null
    };
  }
};

const setPassword = async (username, password, token) => {
  try {
    const response = await fetch(apiClient.baseURL + '/IAM/Auth/set-password', {
      method: 'POST',
      headers: {
        ...apiClient.headers,
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        username,
        password,
        token
      })
    });

    if (response.status !== 200)
      return {
        success: false,
        message: 'Failed to set password',
      }

    return {
      success: true,
      message: 'Password set successfully',
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'Failed to set password',
    };
  }
};

const signUser = async (phoneNumber) => {
  try {
    const response = await fetch(apiClient.baseURL + '/IAM/Auth/sign', {
      method: 'POST',
      headers: apiClient.headers,
      body: JSON.stringify({
        phoneNumber
      })
    });

    if (response.status !== 200)
      return {
        success: false,
        message: 'User sign up failed',
      };
    return {
      success: true,
      message: 'User sign up successful',
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'User sign up failed',
    };
  }
};

const validateUser = async (token) => {
  try {
    const response = await fetch(apiClient.baseURL + '/IAM/Auth/validate', {
      method: 'GET',
      headers: {
        ...apiClient.headers,
        Authorization: `Bearer ${token}`
      }
    });

    if (response.status !== 200)
      return {
        success: false,
        message: 'User validation failed',
        data: null
      };

    let data = await response.json();
    return {
      success: true,
      message: 'User validation successful',
      data: data.user
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'User validation failed',
      data: null
    };
  }
};





const AddCoverSong = async (token, imageFile) => {
  try {
    const formData = new FormData();
    formData.append('image', imageFile);

    const response = await fetch(apiClient.baseURL + '/Media/files/image', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
        // 'Content-Type' را تنظیم نکنید، مرورگر به طور خودکار آن را تنظیم می‌کند
      },
      body: formData
    });

    if (!response.ok) {
      const errorData = await response.json(); // بررسی پاسخ سرور
      console.error("Server error:", errorData);
      return {
        success: false,
        message: errorData.message || 'Failed to upload cover image',
        key: null
      };
    }

    const data = await response.json();
    return {
      success: true,
      message: 'Cover image uploaded successfully',
      key: data.key
    };
  } catch (error) {
    console.error("Error in AddCoverSong:", error);
    return {
      success: false,
      message: 'Failed to upload cover image',
      key: null
    };
  }
};

const AddAudioFile = async (token, audioFile) => {
  try {
    const formData = new FormData();
    formData.append('music', audioFile);

    const response = await fetch(apiClient.baseURL + '/Media/files/music', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
        // 'Content-Type' را تنظیم نکنید، مرورگر به طور خودکار آن را تنظیم می‌کند
      },
      body: formData
    });

    if (!response.ok) {
      const errorData = await response.json(); // بررسی پاسخ سرور
      console.error("Server error:", errorData);
      return {
        success: false,
        message: errorData.message || 'Failed to upload audio file',
        key: null
      };
    }

    const data = await response.json();
    return {
      success: true,
      message: 'Audio file uploaded successfully',
      key: data.key
    };
  } catch (error) {
    console.error("Error in AddAudioFile:", error);
    return {
      success: false,
      message: 'Failed to upload audio file',
      key: null
    };
  }
};




const AddSongToArtist = async (token, songData) => {
  try {
    const response = await fetch(apiClient.baseURL + '/Core/artist/add', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(songData)
    });

    if (response.status !== 200) {
      return {
        success: false,
        message: 'Failed to add song to artist'
      };
    }

    const data = await response.json();
    return {
      success: true,
      message: 'Song added to artist successfully',
      data: data
    };
  } catch (error) {
    console.error("Error in AddSongToArtist:", error);
    return {
      success: false,
      message: 'Failed to add song to artist'
    };
  }
};


const getHomeSongs = async (token) => {
  try {
    const response = await fetch(apiClient.baseURL + '/Core/music/home', {
      method: 'GET',
      headers: {
        ...apiClient.headers,
        Authorization: `Bearer ${token}`
      }
    });

    if (response.status !== 200)
      return {
        success: false,
        message: 'Failed to get home songs',
        data: null
      };

    let data = (await response.json())
    // as {
    //   id: Number;
    //   name: String;
    //   artistId: Number;
    //   releaseDate: Date;
    //   imageKey: String;
    //   musicKey: string;
    //   isLiked: Boolean;
    // }[];
    return {
      success: true,
      message: 'Home songs retrieved successfully',
      data: data
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'Failed to get home songs',
      data: null
    };
  }
}


const getSearchSongs = async (token, search) => {
  try {
    let add = "";
    if (search) {
      add = "?search=" + search;
    }
    const response = await fetch(apiClient.baseURL + '/Core/music/search' + add, {
      method: 'GET',
      headers: {
        ...apiClient.headers,
        Authorization: `Bearer ${token}`
      }
    });

    if (response.status !== 200)
      return {
        success: false,
        message: 'Failed to get home songs',
        data: null
      };

    let data = (await response.json())
    // as {
    //   id: Number;
    //   name: String;
    //   artistId: Number;
    //   releaseDate: Date;
    //   imageKey: String;
    //   musicKey: string;
    //   isLiked: Boolean;
    // }[];
    return {
      success: true,
      message: 'Home songs retrieved successfully',
      data: data
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'Failed to get home songs',
      data: null
    };
  }
}

const likeMusic = async (token, musicId) => {
  try {
    const response = await fetch(apiClient.baseURL + `/Core/music/like/${musicId}`, {
      method: 'POST',
      headers: {
        ...apiClient.headers,
        Authorization: `Bearer ${token}`
      },
    });

    if (response.status !== 200)
      return {
        success: false,
        message: 'Failed to like music'
      };

    return {
      success: true,
      message: 'Music liked successfully'
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'Failed to like music'
    };
  }
}

const unlikeMusic = async (token, musicId) => {
  try {
    const response = await fetch(apiClient.baseURL + `/Core/music/unlike/${musicId}`, {
      method: 'DELETE',
      headers: {
        ...apiClient.headers,
        Authorization: `Bearer ${token}`
      },
    });

    if (response.status !== 200)
      return {
        success: false,
        message: 'Failed to unlike music'
      };

    return {
      success: true,
      message: 'Music unliked successfully'
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'Failed to unlike music'
    };
  }
}


module.exports = {
  signUser,
  verifyPhone,
  setPassword,
  loginUser,
  validateUser,
  AddCoverSong,
  AddAudioFile,
  AddSongToArtist,
  getHomeSongs,
  getSearchSongs,
  likeMusic,
  unlikeMusic,
  apiClient
};


















