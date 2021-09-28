class LoginService {
  account(params) {
    const { username } = params;
    return Promise.resolve({
      status: 'ok',
      type: 'account',
      currentAuthority: username,
    });
  }

  outLogin() {
    return Promise.resolve({
      data: {},
      success: true,
    });
  }

  currentUser(params) {
    const { username } = params;
    return Promise.resolve({
      success: true,
      data: {
        name: username,
        avatar:
          'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
        userid: '00000001',
        email: 'ant@gmail.com',
        signature: '  ',
        title: '  ',
        group: '   ',
        tags: [
          {
            key: '0',
            label: 'xxxxx',
          },
        ],
        notifyCount: 12,
        unreadCount: 11,
        country: 'Colombia',
        access: username,
        geographic: {
          province: {
            label: 'Bogotá',
            key: '330000',
          },
          city: {
            label: 'Bogotá',
            key: '330100',
          },
        },
        address: 'Av 3201 15 48',
        phone: '057-268888888',
      },
    });
  }
}

export default new LoginService();
