import discord from '../../../assets/icons/ic_discord.svg'
import LoginButton from './LoginButton'

const DiscordLogin = (): JSX.Element => {
    const handleDiscordLogin = (): void => {
        window.open(
            'https://discord.com/api/oauth2/authorize?client_id=1157365129202110586&redirect_uri=http%3A%2F%2Flocalhost%3A3000&response_type=code&scope=identify',
            '_parent'
        )
    }
    return (
        <div onClick={handleDiscordLogin}>
            <LoginButton type={discord as string} alt="Discord" />
        </div>
    )
}

export default DiscordLogin
