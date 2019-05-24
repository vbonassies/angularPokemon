import {UserIOComponent} from './user-i-o.component';

describe('user-i-o-component Tests', () => {
    let userIO: UserIOComponent;
    it('should log message', () => {
        userIO = new UserIOComponent();
        userIO.onLogged('testlog');
        expect(userIO.logs[0].message).toBe('testlog');
    });
});
