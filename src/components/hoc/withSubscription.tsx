import { useContext, useEffect, useState } from "react";
import { getRequest } from "../../lib/axios";
import { Accommodation } from "../../types";
import { LoginContext } from "../LoginContext";

const withSubscription =
  <P extends object>(
    WrappedComponent: React.ComponentType<P>,
    URL: string
  ): React.FC<P> =>
  ({ ...props }) => {
    const [accs, setAccs] = useState<Accommodation[] | []>([]);
    const { update, setOpen } = useContext(LoginContext);

    const getAccs = async () => {
      try {
        const res = await getRequest(URL);
        if (res.status === 200) {
          setAccs(res.data);
        }
      } catch (error) {}
    };
    useEffect(() => {
      getAccs();
    }, []);
    useEffect(() => {
      getAccs();
    }, [update]);

    return <WrappedComponent setOpen={setOpen} accs={accs} {...(props as P)} />;
  };

export default withSubscription;
