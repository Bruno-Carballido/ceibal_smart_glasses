import { goresturls } from 'app/services/users/urls'
import { getUsername } from 'app/services/users'
import { env } from 'app/config/env'
import { vi, expect, test } from 'vitest'
import createFetchMock from 'vitest-fetch-mock';

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

test('getUsername - should return username for valid email', async () => {

    const email = 'example@example.com';
    const mockUserData = [{ name: 'John Doe' }];

    fetchMocker.mockOnce(JSON.stringify(mockUserData));

    const username = await getUsername(email);

    expect(username).toBe('John Doe');
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
        `${goresturls.users.byemail}?email=${email}`,
        expect.objectContaining({
            headers: {
                Authorization: `Bearer ${env.GOREST_ACCESS_TOKEN}`,
                'Content-Type': 'application/json',
            },
        })
    );
});

test('should throw error for invalid email', async () => {
    const email = 'invalid-email';

    fetchMocker.mockReject(new Error('Invalid email'));

    await expect(getUsername(email)).rejects.toThrow('Invalid email');
    expect(fetch).toHaveBeenCalledTimes(2);
    expect(fetch).toHaveBeenCalledWith(
        `${goresturls.users.byemail}?email=${email}`,
        expect.objectContaining({
            headers: {
                Authorization: `Bearer ${env.GOREST_ACCESS_TOKEN}`,
                'Content-Type': 'application/json',
            },
        })
    );
});
