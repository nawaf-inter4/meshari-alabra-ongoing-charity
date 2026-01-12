import { Link as SolitoLink } from 'solito/link';
import { useRouter } from 'solito/router';

// Platform-agnostic Link component
export function Link({ href, children, ...props }: any) {
  return (
    <SolitoLink href={href} {...props}>
      {children}
    </SolitoLink>
  );
}

// Platform-agnostic router hook
export { useRouter };
