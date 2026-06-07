type LogoProps = {
    size?: number
}

const Logo = ({ size = 32 }: LogoProps) => (
    <svg
        width={size}
        height={size}
        viewBox='0 0 64 64'
        xmlns='http://www.w3.org/2000/svg'
    >
        <rect
            width='64'
            height='64'
            rx='12'
            fill='#063f43'
            stroke='#334448'
            strokeWidth='1'
        />
        <text
            x='32'
            y='33'
            fontFamily="'JetBrains Mono', 'Courier New', monospace"
            fontSize='26'
            fontWeight='700'
            fill='#d7dbe0'
            textAnchor='middle'
            dominantBaseline='central'
            letterSpacing='1'
        >
            PB
        </text>
    </svg>
)

export default Logo
